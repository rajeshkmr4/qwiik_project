@TC003
Feature: Homepage Elements Validation

  @TC003
  Scenario: Validate header text
    Then header should display "Swag Labs"

  @TC003
  Scenario: Validate primary container elements
    Then primary container should display shopping cart and burger menu

  @TC003
  Scenario: Validate inventory items
    Then six inventory items should be displayed with add to cart button and price format

  @TC003
  Scenario: Validate footer text
    Then footer should display "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
