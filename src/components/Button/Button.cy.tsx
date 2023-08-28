import React from 'react';
import Button from './Button';

const ButtonComponent = () => {
  return <Button type="primary" text="Button" onClick={() => {}} />;
};

describe('Table', () => {
  beforeEach(() => {
    cy.mount(<ButtonComponent />);
  });

  it('should render the button', () => {
    cy.get('button').should('exist').should('have.text', 'Button');
  });
});
