import tkinter as tk

class MainWindow:
    def __init__(self, root):
        self.root = root
        self.root.attributes('-fullscreen', True)
        self.root.bind('<Escape>', self.exit_fullscreen)

        self.create_window()

    def exit_fullscreen(self, event):
        self.root.attributes('-fullscreen', False)
        self.root.quit()

    def create_window(self):
        main_label = tk.Label(self.root, text="Secretary Day Prototype 0.0", font=("Helvetica", 36))
        main_label.pack(fill=tk.BOTH, expand=True)

        open_calendar = tk.Button(self.root,text="Open calendar",command=self.create_calendar)
        open_calendar.pack()

    def create_calendar(self):
        smaller_window = tk.Toplevel(self.root)
        smaller_window.title("Calendar")
        smaller_window.geometry("400x300")

        label = tk.Label(smaller_window, text="Smaller Window Content")
        label.pack()


class Calendar:
    def __init__(self,root):
        self.root = root

        self.create_window()

    def create_window(self):
        smaller_window = tk.Toplevel(self.root)
        smaller_window.title("Calendar")
        smaller_window.geometry("400x300")

        label = tk.Label(smaller_window, text="Smaller Window Content")
        label.pack()


if __name__ == "__main__":
    root = tk.Tk()
    app = MainWindow(root)
    root.mainloop()
