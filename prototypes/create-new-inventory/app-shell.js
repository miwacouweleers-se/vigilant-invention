/**
 * Vertex Prototype App Shell JavaScript
 * 
 * Handles interactive behavior for:
 * - Sidebar navigation
 * - Submenu panel show/hide
 * - Active state management
 * - Menu collapse/expand
 */

(function() {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  
  const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
  const submenuPanel = document.getElementById('submenuPanel');
  const submenuContents = document.querySelectorAll('.submenu-content');
  const menuToggle = document.querySelector('.menu-toggle');

  // ============================================
  // State
  // ============================================
  
  let currentSection = null;  // No section selected initially
  let isSubmenuCollapsed = true;  // Start collapsed

  // ============================================
  // Functions
  // ============================================

  /**
   * Switch to a different section
   * @param {string} section - The section identifier
   */
  function switchSection(section) {
    // If clicking the same section and submenu is open, close it
    if (section === currentSection && !isSubmenuCollapsed) {
      toggleSubmenu();
      return;
    }

    currentSection = section;

    // Update sidebar active states
    sidebarItems.forEach(item => {
      if (item.dataset.section === section) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update submenu content visibility
    submenuContents.forEach(content => {
      if (content.dataset.section === section) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });

    // Expand submenu if collapsed
    if (isSubmenuCollapsed) {
      toggleSubmenu();
    }
  }

  /**
   * Toggle submenu panel collapse/expand
   */
  function toggleSubmenu() {
    isSubmenuCollapsed = !isSubmenuCollapsed;
    
    if (isSubmenuCollapsed) {
      submenuPanel.classList.add('collapsed');
      menuToggle.querySelector('i').className = 'fa-light fa-arrow-right-to-line';
    } else {
      submenuPanel.classList.remove('collapsed');
      menuToggle.querySelector('i').className = 'fa-light fa-arrow-right-from-line';
    }
  }

  /**
   * Handle submenu item click
   * @param {Event} event - Click event
   */
  function handleSubmenuItemClick(event) {
    const item = event.target.closest('.submenu-item');
    if (!item) return;

    // Remove active from all submenu items in current section
    const currentSubmenu = document.querySelector(`.submenu-content[data-section="${currentSection}"]`);
    if (currentSubmenu) {
      currentSubmenu.querySelectorAll('.submenu-item').forEach(i => {
        i.classList.remove('active');
      });
    }

    // Add active to clicked item
    item.classList.add('active');
    
    // Close the submenu panel after selecting an item
    if (!isSubmenuCollapsed) {
      toggleSubmenu();
    }
  }

  // ============================================
  // Event Listeners
  // ============================================

  // Sidebar item clicks
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (section) {
        switchSection(section);
      }
    });
  });

  // Menu toggle click
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleSubmenu);
  }

  // Submenu item clicks
  if (submenuPanel) {
    submenuPanel.addEventListener('click', handleSubmenuItemClick);
  }

  // ============================================
  // Keyboard Navigation
  // ============================================

  document.addEventListener('keydown', (event) => {
    // Escape to collapse submenu
    if (event.key === 'Escape' && !isSubmenuCollapsed) {
      toggleSubmenu();
    }
  });

  // ============================================
  // Initialization
  // ============================================

  // Menu starts collapsed - no initial section switch needed
  // Clicking a sidebar item will open the submenu
  
  // Log initialization
  console.log('Vertex App Shell initialized (menu collapsed)');

})();
