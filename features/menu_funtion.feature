@TC_004
Feature: Burger Menu functionality

  Background:
    Given I am on the login page
    When I enter username "standard_user" and password "secret_sauce"
    Then I should see the home page

  Scenario: Open menu and validate options
    When I open the burger menu
    Then the menu should display the following options:
      | All Items        |
      | About            |
      | Logout           |
      | Reset App State  |

  Scenario: Close the menu
    When I open the burger menu
    And I close the burger menu
    Then the menu should be closed
