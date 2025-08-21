@TC002
Feature: Login functionality (Negative)

  @TC002
  Scenario: Login attempt with wrong credentials
    Given I am on the login page
    When I enter username "wrong_user" and password "wrong_pass"
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"
