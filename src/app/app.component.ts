import { Component } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import * as accessLevelsDataJSON from '../app/data/accessLevels.json';
import * as readersDataJSON from '../app/data/readers.json';
import * as readerTypesDataJSON from '../app/data/readerTypes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readerData;
  profileForm: FormGroup;
  searchText: string;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the variable in Constructor
    this.readerData = [];
    this.getMappedData();
    this.generateAccessForm();
  }

  /**
   * This function maps the data from different json objects into readerData to display on UI
   */
  generateAccessForm() {
    this.profileForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      reader: ['All Reader Groups'] // Setting a Default on page load
    });
  }

  /**
   * Filtering the json data into 1 array of object to be traversed on the UI table
   */
  getMappedData() {
    accessLevelsDataJSON.map(accessID => {
      return readersDataJSON.map(readerID => {
        if (readerID.id === accessID.readerId) {
          return readerTypesDataJSON.map(readerTypesID => {
            if (readerID.typeId === readerTypesID.id) {
              const readerDataValue = {...accessID, readerName: readerID.name, readerTypeName: readerTypesID.name};
              this.readerData.push(readerDataValue);
            }
          });
        }
      });
    });
    return this.readerData;
  }

  /**
   * Populate values in the form based on the row which is clicked.
   * @param event
   */
  displayTable(event: any) {
    this.profileForm.get('id').setValue(event.id);
    this.profileForm.get('name').setValue(event.name);
    this.profileForm.get('description').setValue(event.Description);
    this.profileForm.get('reader').setValue(event.readerName);
  }

  /**
   * Save form data once the user hits Save button and update the table with the new values
   */
  saveFormData() {
    if (this.profileForm.dirty) {
      for (const i in this.readerData) {
        if (this.readerData[i].id === this.profileForm.get('id').value) {
          this.readerData[i].name = this.profileForm.get('name').value;
          this.readerData[i].readerName = this.profileForm.get('reader').value;
        }
      }
    }
  }
}
