import tkinter as tk
from datetime import datetime

def update_countdown():
    current_time = datetime.now()
    remaining_time = target_time - current_time
    remaining_seconds = int(remaining_time.total_seconds())
    
    if remaining_seconds <= 0:
        countdown_label.config(text="00:00:00")
    else:
        hours, remainder = divmod(remaining_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        countdown_label.config(text=f"{hours:02}:{minutes:02}:{seconds:02}")
    
    root.after(1000, update_countdown)

target_time = datetime.strptime("2024-11-09 18:00:00", "%Y-%m-%d %H:%M:%S")

root = tk.Tk()
root.title("Gamejam Countdown!")
root.geometry("250x60")
root.resizable(False, False)

root.attributes("-topmost", True)

countdown_label = tk.Label(root, font=("Helvetica", 30), fg="black", bg="white")
countdown_label.pack(expand=True)

update_countdown()

root.mainloop()
