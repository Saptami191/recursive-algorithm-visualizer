import time
import os
import sys

class Style:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    CYAN = "\033[36m"
    YELLOW = "\033[33m"
    MAGENTA = "\033[35m"
    GREEN = "\033[32m"
    RED = "\033[31m"
    BG_BLUE = "\033[44m"

def clear_terminal():
    if os.name == 'nt':
        os.system('cls')
    else:
        sys.stdout.write("\033[H\033[J")
        sys.stdout.flush()

class HanoiVisualizer:
    def __init__(self, num_disks):
        self.num_disks = num_disks
        self.pegs = {
            'A': list(range(num_disks, 0, -1)),
            'B': [],
            'C': []
        }
        self.moves = 0
        self.max_width = (num_disks * 2) + 2
        self.recursion_depth = 0

    def get_disk_color(self, size):
        colors = [Style.CYAN, Style.YELLOW, Style.MAGENTA, Style.GREEN, Style.RED]
        return colors[size % len(colors)]

    def draw(self, comment=""):
        clear_terminal()
        print(f"{Style.BOLD}{Style.CYAN}--- TOWER OF HANOI: RECURSION MASTERCLASS ---{Style.RESET}")
        print(f"Moves: {Style.YELLOW}{self.moves}{Style.RESET} | Recursion Depth: {Style.MAGENTA}{self.recursion_depth}{Style.RESET}")
        print(f"Status: {Style.GREEN}{comment}{Style.RESET}\n")
        
        rows = []
        for level in range(self.num_disks - 1, -1, -1):
            row_content = ""
            for peg_id in ['A', 'B', 'C']:
                peg = self.pegs[peg_id]
                if level < len(peg):
                    size = peg[level]
                    color = self.get_disk_color(size)
                    disk_width = size * 2
              
                    disk = f"{color}{'=' * disk_width}{Style.RESET}"
                    padded_disk = disk.center(self.max_width + len(color) + len(Style.RESET))
                    row_content += padded_disk
                else:
                    
                    row_content += f"{Style.BOLD}|{Style.RESET}".center(self.max_width)
                row_content += "  "
            rows.append(row_content)
        
        for row in rows:
            print(row)

        print(f"{Style.BOLD}{'=' * (self.max_width * 3 + 6)}{Style.RESET}")
        labels = f"{'PEG A'.center(self.max_width)}  {'PEG B'.center(self.max_width)}  {'PEG C'.center(self.max_width)}"
        print(labels)
        print("\n")
        time.sleep(0.4)

    def move_disk(self, source, target):
        disk = self.pegs[source].pop()
        self.pegs[target].append(disk)
        self.moves += 1
        self.draw(f"Moved Disk {disk} from {source} to {target}")


    def solve(self, n, source, target, auxiliary):
        """
        Recursive algorithm to solve Tower of Hanoi.
        """
        self.recursion_depth += 1
        
        if n == 1:
            self.move_disk(source, target)
            self.recursion_depth -= 1
            return

        self.solve(n - 1, source, auxiliary, target)

        self.move_disk(source, target)

        self.solve(n - 1, auxiliary, target, source)
        
        self.recursion_depth -= 1

if __name__ == "__main__":
    if os.name == 'nt':
        os.system('') 

    try:
        n = int(input("Enter number of disks (3-7 recommended): ") or "4")
    except ValueError:
        n = 4

    viz = HanoiVisualizer(n)
    viz.draw("Initializing setup...")
    time.sleep(1.5)
    
    viz.solve(n, 'A', 'C', 'B')
    
    print(f"{Style.BOLD}{Style.GREEN}MISSION ACCOMPLISHED!{Style.RESET}")
    print(f"Total moves made recursively: {viz.moves}")
    print(f"\n{Style.CYAN}TIP: For a professional browser visualization, open 'index.html' in your browser.{Style.RESET}")
