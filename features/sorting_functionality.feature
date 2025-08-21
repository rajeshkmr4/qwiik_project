@TC_005
Feature: Inventory Sorting Filter

  Scenario: Verify filter container and sorting options
    When I check if the filter container is visible
    Then the filter container should have options:
      | Name (A to Z)   |
      | Name (Z to A)   |
      | Price (low to high) |
      | Price (high to low) |

  Scenario: Sort inventories by name descending (Z to A) and verify sorting
    When I select the filter option "Name (Z to A)"
    Then the inventory items should be sorted by name descending (Z to A)

  Scenario: Sort inventories by price high to low and verify sorting
    When I select the filter option "Price (high to low)"
    Then the inventory item prices should be sorted descending
