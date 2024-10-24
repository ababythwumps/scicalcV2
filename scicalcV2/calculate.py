from sympy import symbols, solve, sympify

def calculate(equation_str):
    """Solve mathematical equations using sympy.
    
    Args:
        equation_str (str): String representation of the equation (e.g., '2*x + 1 = 5')
        
    Returns:
        dict: {
            'result': List of solutions or None if error,
            'error': Error message or None if successful
        }
        
    Examples:
        >>> calculate('2*x + 1 = 5')
        {'result': [2.0], 'error': None}
        
        >>> calculate('x**2 - 4 = 0')
        {'result': [-2.0, 2.0], 'error': None}
        
        >>> calculate('invalid')
        {'result': None, 'error': 'Invalid equation format'}
    """
    try:
        # Handle empty or invalid input
        if not equation_str or '=' not in equation_str:
            return {'result': None, 'error': 'Invalid equation format'}
            
        # Split equation into left and right sides
        left_side, right_side = equation_str.split('=')
        
        # Create symbolic variable
        x = symbols('x')
        
        # Convert string expressions to sympy expressions
        left_expr = sympify(left_side.strip())
        right_expr = sympify(right_side.strip())
        
        # Rearrange to standard form: expression = 0
        equation = left_expr - right_expr
        
        # Solve the equation
        solutions = solve(equation, x)
        
        # Convert solutions to regular Python numbers where possible
        solutions = [complex(sol) if sol.is_complex else float(sol) for sol in solutions]
        
        return {'result': solutions, 'error': None}
        
    except Exception as e:
        return {'result': None, 'error': str(e)}
