import unittest
from calculate import calculate

class TestCalculate(unittest.TestCase):
    def test_linear_equation(self):
        result = calculate('2*x + 1 = 5')
        self.assertIsNone(result['error'])
        self.assertAlmostEqual(result['result'][0], 2.0)

    def test_quadratic_equation(self):
        result = calculate('x**2 - 4 = 0')
        self.assertIsNone(result['error'])
        self.assertEqual(len(result['result']), 2)
        self.assertIn(2.0, result['result'])
        self.assertIn(-2.0, result['result'])

    def test_invalid_equation(self):
        result = calculate('2*x + 1')
        self.assertIsNotNone(result['error'])
        self.assertIsNone(result['result'])

    def test_complex_solution(self):
        result = calculate('x**2 + 1 = 0')
        self.assertIsNone(result['error'])
        self.assertEqual(len(result['result']), 2)
        self.assertTrue(any(isinstance(x, complex) for x in result['result']))

if __name__ == '__main__':
    unittest.main()
