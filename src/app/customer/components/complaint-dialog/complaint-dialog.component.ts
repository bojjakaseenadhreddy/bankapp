import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintModel } from '../../../../interfaces/ComplaintModel';
import { ComplaintService } from '../../../core/services/complaint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaint-dialog',
  templateUrl: './complaint-dialog.component.html',
  styleUrls: ['./complaint-dialog.component.css']
})
export class ComplaintDialogComponent implements OnInit {
  displayedColumns = ["id", "description", "action"];
  descriptionArray: Array<{ id: number, old: string, current: string }> = [];
  idArray: Array<number> = [];
  complaintModel: ComplaintModel;
  show = false;
  isUpdated = false;
  description: string;
  dataSource = new MatTableDataSource<ComplaintModel>();
  constructor(
    public dialogRef: MatDialogRef<ComplaintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private complaintService: ComplaintService, private snackBar: MatSnackBar,
    private http:HttpClient) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.complaints);
  }
  showInputField(id: number) {
    if (!this.show) {
      return true;;
    }
    if (this.idArray.length > 0) {
      if (this.idArray.includes(id))
        return false;
      else
        return true;
    } else {
      return true;
    }
  }

  displayUpdate(id: number): boolean {
    let isTrue = false;
    if (this.descriptionArray.length < 0) {
      return false;
    } else {
      this.descriptionArray.forEach(model => {
        if (model.id == id && model.old != model.current) {
          // console.log("inside displayupdate::" + id);
          isTrue = true;
        }
        if (this.isUpdated) {
         console.log("inside displayupdate:: for showing edit" + id);
          isTrue = false;
        }
        if (model.id == id && model.old == model.current) {
          isTrue = true;
        }
        else { isTrue = false }
      })
    }
    console.log("isTrue::" + isTrue);
    return isTrue;
  }
  openSnackBar(status: string, id: number) {
    this.snackBar.open(`Complaint Updated successfully Status..`, "close", {
      duration: 2000,
    });
  }

  updateDescription(id: number,complaintModel:ComplaintModel) {
   console.log("inside update statusss..."+id+""+complaintModel.description);
    let complaintId;
    let description;
    this.descriptionArray.forEach(model => {
      if (model.id == id) {
        this.data.complaints.forEach(complaint => {
          if (complaint.description === model.current) {
            complaintId = complaint.id;
            this.description = complaint.description
            this.data.complaints.forEach((model) => {
              if (model.id == id) {
                model.statusModel.id = complaintId;
                this.complaintModel = model;
              }
            });

          }
        })

      }
    });
console.log("complaintModel::"+complaintModel);
    this.complaintService.updateComplaintById(id, complaintModel).subscribe((response) => {

      console.log(response);

      if (response.status === 200) {
        this.isUpdated = true;
        if (this.isUpdated) {
          this.openSnackBar(this.description, id);
        }
        this.dataSource.data.forEach((model) => {
          if (model.id == id) {
            //model.complaintModel.description = this.description;
          }
        });
        this.descriptionArray.forEach((complaintModel, index) => {
          if (complaintModel.id == id) {
            this.descriptionArray.splice(index, 1);
          }
        });
        this.idArray.forEach((complaintId, index) => {
          if (complaintId == id)
            this.idArray.splice(index, 1);
        });
        this.show = false;
        this.displayUpdate(id);
      } (error) => {
        console.log(error);
      }
    });


  }

  edit(id: number, description: string) {
    // this.isUpdated = false;
    this.idArray.push(id);
    this.descriptionArray.push({
      id: id,
      old: description,
      current: description
    });
    this.show = true;
    this.showInputField(id);
  }
}
