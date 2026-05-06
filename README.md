# RISC-V High Precision Code Base - Tower of Hanoi Demo

This repository features a "premium" implementation of the **Tower of Hanoi**, designed to demonstrate the elegance and power of **Recursion** in a terminal environment.

## The Demo: Tower of Hanoi
The Tower of Hanoi is a mathematical puzzle that serves as the quintessential example of a recursive algorithm. 

### Key Features
- **Visual Recursion**: The script tracks and displays the "Recursion Depth" in real-time, showing how the function calls itself to break down the problem.
- **ANSI Styling**: Uses rich colors and bold formatting to create a premium terminal experience.
- **Educational Comments**: The source code is heavily commented to explain the relationship between recursive calls and iterative steps.

## Algorithm

The recursive solution works in three steps:

1. Move `n-1` disks from source to auxiliary peg
2. Move the largest disk to destination
3. Move `n-1` disks from auxiliary to destination

Base Case:
- If only one disk remains, move it directly.

## Complexity Analysis

- Time Complexity: `O(2^n)`
- Space Complexity: `O(n)`
- Minimum Moves Required: `2^n - 1`

### How to Run
1. Ensure you have Python installed.
2. Run the script:
   ```bash
   python hanoi_recursion_demo.py
   ```
3. Input the number of disks (e.g., 4) and watch the recursion solve the puzzle.

## Technical Context for RISC-V
In a RISC-V environment, recursion is a critical test of stack management and the efficient use of the `ra` (return address) and `sp` (stack pointer) registers.

## Web Visualization (Submission-Ready)
For a more professional and interactive experience, we have included a web-based version.

- **Files**: `index.html`, `style.css`, `script.js`
- **Key Features**: Real-time recursion depth display, adjustable speed, and smooth disk animations.
- **Run**: Simply open `index.html` in any web browser.

---
*Created for the "Broadening the RISC-V High Precision Code Base and Reach" initiative.*


<img width="1871" height="903" alt="image" src="https://github.com/user-attachments/assets/bc362fb2-cda7-44c8-a6f5-bd1030305c52" />

<img width="1242" height="373" alt="image" src="https://github.com/user-attachments/assets/64cd2032-7371-49e9-8b34-160a05cf3974" />
