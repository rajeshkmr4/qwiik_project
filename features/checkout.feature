@TC_006
Feature: Shopping Cart and Checkout Flow

  Scenario: Add two items to cart, verify, remove one, and checkout
    When I add the first two inventory items to the cart
    And I go to the shopping cart container
    Then I should see the first two added items in the cart

    When I remove the second item from the cart
    Then only the first item should remain in the cart

    When I proceed to checkout with details:
      | FirstName | John    |
      | LastName  | Kennedy |
      | PostalCode| 100001  |
    Then I should see the checkout overview page with added item

    When I finish the checkout process
    Then I should see the order completion message
