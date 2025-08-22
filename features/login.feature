@TC_001
Feature: Login functionality (Positive)

  @TC_001
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "standard_user" and password "secret_sauce"
    Then I should see the home page
