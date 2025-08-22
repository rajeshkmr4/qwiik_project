@TC_003
Feature: Homepage Elements Validation

  @TC_003
  Scenario: Validate header text
    Then header should display "Swag Labs"

  @TC_003
  Scenario: Validate primary container elements
    Then primary container should display shopping cart and burger menu

  @TC_003
  Scenario: Validate inventory items
    Then six inventory items should be displayed with add to cart button and price format

  @TC_003
  Scenario: Validate footer text
    Then footer should display "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
