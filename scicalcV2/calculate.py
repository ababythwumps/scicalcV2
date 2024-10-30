"""import sympy as sp
from sympy import symbols, solve, sympify"""
import sympy as sp

@app.route('/calculate', methods=['POST'])
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
    

from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import json

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Get the content length of the request
        content_length = int(self.headers['Content-Length'])
        # Read the body of the request
        post_data = self.rfile.read(content_length).decode('utf-8')
        # Parse the form data
        parsed_data = urllib.parse.parse_qs(post_data)
        param = parsed_data.get('param', [None])[0]  # Extract 'param'

        # Call your function with the parameter
        result = calculate(param)

        # Send a 200 OK response
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        # Prepare the response
        response = json.dumps({'result': result})
        self.wfile.write(response.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler):
    server_address = ('', 8000)  # Listen on all interfaces at port 8000
    httpd = server_class(server_address, handler_class)
    print("Starting server on http://localhost:8000/...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()