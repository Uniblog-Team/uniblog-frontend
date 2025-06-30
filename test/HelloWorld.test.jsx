import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from '../src/components/HelloWorld';


describe('HelloWorld Component', () => {
    test('renders hello world message', () => {
      render(<HelloWorld />);

      expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });
  });