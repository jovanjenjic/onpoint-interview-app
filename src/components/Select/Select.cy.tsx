import React from 'react';
import Select from './Select';
import Styleguide from '../StyleGuide/StyleGuide';

const dropdownValues = ['Option 1', 'Option 2', 'Option 3'];
describe('Single Select Component', () => {
  beforeEach(() => {
    cy.mount(
      <>
        <Styleguide />
        <Select
          dropdownValues={dropdownValues}
          isLoading={false}
          multiple={false}
          onInputChangeHandler={() => {}}
        />
      </>,
    );
  });

  it('displays the input', () => {
    cy.get('input').should('be.visible');
  });

  it('displays options when input is clicked', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').should(
      'have.length',
      dropdownValues.length,
    );
  });

  it('selects a single option', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('input').should('have.value', dropdownValues[0]);
  });

  it('displays selected item', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('input').should('have.value', dropdownValues[0]).click();
  });

  it('removes selected item', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('[class*=x-icon]').first().click();
    cy.get('[class*=input-content__selected-item]').should('not.exist');
  });
});

describe('Loading Select Component', () => {
  beforeEach(() => {
    cy.mount(
      <>
        <Styleguide />
        <Select
          dropdownValues={dropdownValues}
          isLoading={true}
          multiple={false}
          onInputChangeHandler={() => {}}
        />
      </>,
    );
  });
  it('displays loading spinner when isLoading is true', () => {
    cy.get('input').click();
    cy.get('[class*=spinner-icon]').should('be.visible');
    cy.get('[class*=dropdown__option--loading]').should('be.visible');
  });
});

describe('No Result Select Component', () => {
  beforeEach(() => {
    cy.mount(
      <>
        <Styleguide />
        <Select
          dropdownValues={[]}
          isLoading={false}
          multiple={false}
          onInputChangeHandler={() => {}}
        />
      </>,
    );
  });
  it('displays no result message', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option--no-result]').should('be.visible');
  });
});

describe('Multiple Select Component', () => {
  beforeEach(() => {
    cy.mount(
      <>
        <Styleguide />
        <Select
          dropdownValues={dropdownValues}
          isLoading={false}
          multiple={true}
          onInputChangeHandler={() => {}}
        />
      </>,
    );
  });
  it('displays multiple selected items', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').eq(1).click();
    cy.get('[class*=input-content__selected-item]').should('have.length', 2);
  });

  it('displays options in dropdown', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').should(
      'have.length',
      dropdownValues.length,
    );
  });

  it('toggles dropdown on click', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown]').should('be.visible');
    cy.get('input').click();
    cy.get('[class*=dropdown]').should('not.exist');
  });

  it('calls onDeleteAllItems on delete all click', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').eq(1).click();
    cy.get('[class*=x-icon]').last().click();
    cy.get('[class*=input-content__selected-item]').should('not.exist');
  });

  it('calls onDeleteItem on delete icon click', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('[class*=x-icon]').first().click();
    cy.get('[class*=input-content__selected-item]').should('not.exist');
  });
});
