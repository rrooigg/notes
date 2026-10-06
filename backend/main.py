import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# initialize application
app = FastAPI(debug=True)

# create the models/classes
class Note(BaseModel):
  content: str

class Notes(BaseModel):
  notes: list[Note]

# CORS
origins = [
  "http://localhost:5173",

]
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_headers=["*"],
  allow_methods=["*"],

)

# in-memory db
memory_db = {
  "notes": []
}

# define routes
@app.post("/notes")
def add_note(note: Note):
  memory_db["notes"].append(note)
  return note

@app.get("/notes", response_model=Notes)
def get_notes():
  return {"notes": memory_db["notes"]}