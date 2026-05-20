import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { canoasServices } from '../../../content/services/canoas-services';
import { ContactsScreen } from '../ContactsScreen';

describe('ContactsScreen', () => {
  it('renders all configured Canoas services', () => {
    render(<ContactsScreen />);

    canoasServices.services.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });
  });
});
