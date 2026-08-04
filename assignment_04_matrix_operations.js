// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const rowInput = readlineSync.question(`Enter row ${i + 1}: `);
    const values = rowInput.split(' ').map(Number);
    matrix.push(values);
  }

  return matrix;
}

function displayMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let rowString = '';
    for (let j = 0; j < matrix[i].length; j++) {
      rowString += String(matrix[i][j]).padStart(4);
    }
    console.log(rowString);
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

function addMatrices(matrixA, matrixB) {
  const result = [];

  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixA[i].length; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    return null;
  }

  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}

function main() {
  console.log('=== MATRIX OPERATIONS ===');
  console.log('1. Transpose a matrix');
  console.log('2. Add two matrices');
  console.log('3. Multiply two matrices');
  console.log('4. Quit');

  const choice = readlineSync.questionInt('Enter your choice (1-4): ');

  if (choice === 1) {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const cols = readlineSync.questionInt('Enter number of columns: ');
    const matrix = readMatrix(rows, cols);

    console.log('Original Matrix:');
    displayMatrix(matrix);
    console.log('Transposed Matrix:');
    displayMatrix(transposeMatrix(matrix));
  } else if (choice === 2) {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const cols = readlineSync.questionInt('Enter number of columns: ');

    console.log('Enter matrix A:');
    const matrixA = readMatrix(rows, cols);
    console.log('Enter matrix B:');
    const matrixB = readMatrix(rows, cols);

    console.log('Sum of matrices:');
    displayMatrix(addMatrices(matrixA, matrixB));
  } else if (choice === 3) {
    const rowsA = readlineSync.questionInt('Enter number of rows for matrix A: ');
    const colsA = readlineSync.questionInt('Enter number of columns for matrix A: ');
    const rowsB = readlineSync.questionInt('Enter number of rows for matrix B: ');
    const colsB = readlineSync.questionInt('Enter number of columns for matrix B: ');

    if (colsA !== rowsB) {
      console.log('Error: Columns of A must match rows of B.');
      return;
    }

    console.log('Enter matrix A:');
    const matrixA = readMatrix(rowsA, colsA);
    console.log('Enter matrix B:');
    const matrixB = readMatrix(rowsB, colsB);

    const product = multiplyMatrices(matrixA, matrixB);
    if (product === null) {
      console.log('Error: Matrix dimensions are invalid for multiplication.');
    } else {
      console.log('Product of matrices:');
      displayMatrix(product);
    }
  } else if (choice === 4) {
    console.log('Goodbye!');
  } else {
    console.log('Invalid choice.');
  }
}

main();

