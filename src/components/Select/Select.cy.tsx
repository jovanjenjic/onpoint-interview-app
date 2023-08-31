import React from 'react';
import Select from './Select';
import Styleguide from '../StyleGuide/StyleGuide';
import { DropdownValues } from './types';

const dropdownValues: DropdownValues[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

const SelectComponent = ({
  isLoading = false,
  multiple = false,
  dropdown,
}: {
  isLoading?: boolean;
  multiple?: boolean;
  dropdown?: DropdownValues[];
}) => {
  const [dropdownState, setDropdownState] = React.useState(
    dropdown || dropdownValues,
  );

  return (
    <>
      <Styleguide />
      <Select
        dropdownValues={dropdownState}
        itemKey="name"
        isLoading={isLoading}
        multiple={multiple}
        onInputChangeHandler={(value) =>
          value &&
          setDropdownState(() =>
            dropdownValues.filter((item) => item.name === value),
          )
        }
      />
    </>
  );
};

describe('Single Select Component', () => {
  beforeEach(() => {
    cy.mount(<SelectComponent />);
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
    cy.get('input').should('have.value', dropdownValues[0].name);
  });

  it('displays selected item', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('input').should('have.value', dropdownValues[0].name).click();
  });

  it('removes selected item', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option]').first().click();
    cy.get('[class*=x-icon]').first().click();
    cy.get('[class*=input-content__selected-item]').should('not.exist');
  });

  it('filters options based on input value', () => {
    const searchTerm = 'Option 2';
    cy.get('input').type(searchTerm);
    cy.get('[class*=dropdown__option]').should('have.length', 1);
    cy.get('[class*=dropdown__option]').should('contain', searchTerm);
  });
});

describe('Loading Select Component', () => {
  beforeEach(() => {
    cy.mount(<SelectComponent isLoading={true} />);
  });
  it('displays loading spinner when isLoading is true', () => {
    cy.get('input').click();
    cy.get('[class*=spinner-icon]').should('be.visible');
    cy.get('[class*=dropdown__option--loading]').should('be.visible');
  });
});

describe('No Result Select Component', () => {
  beforeEach(() => {
    cy.mount(<SelectComponent dropdown={[]} />);
  });
  it('displays no result message', () => {
    cy.get('input').click();
    cy.get('[class*=dropdown__option--no-result]').should('be.visible');
  });
});

describe('Multiple Select Component', () => {
  beforeEach(() => {
    cy.mount(<SelectComponent multiple={true} />);
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

  it('filters options based on input value', () => {
    const searchTerm = 'Option 3';
    cy.get('input').type(searchTerm);
    cy.get('[class*=dropdown__option]').should('have.length', 1);
    cy.get('[class*=dropdown__option]').should('contain', searchTerm);
  });

  it('Should have correct ARIA attributes and labels', () => {
    cy.get('[aria-label="Clear options"]').should('exist');
    cy.get('[aria-label="Open dropdown"]').should('exist');
    cy.get('input').click();
    cy.get(`[aria-label="${dropdownValues[0].name}"]`).should('exist');
  });

  it('Should select an option on click', () => {
    cy.get('[aria-label="Open dropdown"]').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('input').type('{downarrow}');
    cy.get('input').type('{downarrow}');
    cy.get('input').type('{enter}');
    cy.get('[class*=dropdown__option]').should('contain', 'Option 1');
  });
});
