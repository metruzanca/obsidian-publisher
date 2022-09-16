import { Editor } from "obsidian";
import { API_URL } from "./constants";
import axios from 'axios'

export default class Publisher {
  constructor(
    private editor: Editor
  ) {}

  async publish() {
    console.log('Posting to ', API_URL);
    const response = await axios(API_URL, { data: 'Hello, Obsidian' });

    console.log(response.status , response.data);
  }
}