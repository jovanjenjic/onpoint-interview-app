import React from 'react';
import Button from './Button';
import Styleguide from '../StyleGuide/StyleGuide';

const buttonText = 'Submit';
const alertText = 'Button clicked!';

const ButtonComponent = ({ type }: { type: 'primary' | 'secondary' }) => {
  return (
    <>
      <Styleguide />
      <Button type={type} text={buttonText} onClick={() => alert(alertText)} />
    </>
  );
};

describe('Button primary', () => {
  beforeEach(() => {
    cy.mount(<ButtonComponent type="primary" />);
  });

  it('displays the button', () => {
    cy.get('button').should('be.visible');
  });

  it('has a blue background when type is primary', () => {
    cy.get('button')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(44, 139, 255)');
  });

  it('displays the correct text in the button', () => {
    cy.get('button').should('contain', buttonText);
  });

  it('calls the onClick handler when clicked', () => {
    cy.get('button').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(alertText);
    });
  });

  it('changes background color on hover', () => {
    cy.get('button')
      .trigger('mouseover')
      .should('have.css', 'background-color', 'rgb(44, 139, 255)');
  });
});

describe('Button secondary', () => {
  beforeEach(() => {
    cy.mount(<ButtonComponent type="secondary" />);
  });

  it('displays the button', () => {
    cy.get('button').should('be.visible');
  });

  it('has a gray background when type is secondary', () => {
    cy.get('button')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(200, 205, 212)');
  });

  it('changes background color on hover', () => {
    cy.get('button')
      .trigger('mouseover')
      .should('have.css', 'background-color', 'rgb(200, 205, 212)');
  });
});
