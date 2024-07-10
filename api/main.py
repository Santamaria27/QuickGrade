from typing import Union

from fastapi import FastAPI

#from readtrial import get_all_docs
from openAPI import main as openapimain

app = FastAPI()


@app.get("/read_firebase_data")
def read_firebase_data(param1: str, param2: str):
    # Call the function from readtrial.py to read data from Firebase
    #res=get_all_docs("trial1")
    #return res
    openapimain(param1,param2)
    res="something"
    return res