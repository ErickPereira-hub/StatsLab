/*
This function receives a polynomial as an array of coefficients
and returns a string representing it.

For example:

INPUT >> [0.11, 1.2, 0.0004, 3.2, -10.1, 1, 0.0000102, 2, 3]

OUTPUT >> P(x) = 0.11 + 1.20x + 3.20x³ - 10.10x⁴ + 1.00x⁵ + 2.00x⁷ + 3.00x⁸
*/

export function fillPolynomial(coeffs) {

    const degs = "²³⁴⁵⁶⁷⁸⁹";
    let poly = `P(x) = `;
    const PRECISION = 0.01;

    if (Math.abs(coeffs[0]) > PRECISION) {
        poly += `${coeffs[0].toFixed(2)}`;
    }

    coeffs.forEach((val, ind) => {

        if (Math.abs(val) > PRECISION) {
 
            if (ind === 1) {
                poly += ` ${(val < 0) ? "- " : "+ "}${Math.abs(val).toFixed(2)}x`;
            }
            else if (ind > 1 && ind < 10) {
                poly += ` ${(val < 0) ? "- " : "+ "}${Math.abs(val).toFixed(2)}x${degs.charAt(ind - 2)}`;
            }

        }

    });

    if (coeffs.length === 11 && Math.abs(coeffs[10]) > PRECISION) {
        poly += ` ${(coeffs[10] < 0) ? "- " : "+ "}${Math.abs(coeffs[10]).toFixed(2)}x¹⁰`;
    }

    return poly;
}