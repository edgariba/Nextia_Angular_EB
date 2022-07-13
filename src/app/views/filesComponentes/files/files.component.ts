import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonAlerts } from 'src/app/common-alerts';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { FilesService } from 'src/app/providers/files-service/files.service';
import { saveAs } from 'file-saver';
declare var $: any

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  isLoading: boolean = false;
  isLoaded: boolean = false;
  isLoadFile: boolean = false;
  archivos: any[] = []
  formData: FormData = new FormData();

  public displayedColumns = ['name', 'ruta', 'action'];
  constructor(private common: CommonAlerts,
    private filesService: FilesService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllFiles()
  }

  onChangeFileInput(event: any): void {
    var filesLoad = event.target.files
    var loadedFiles = ""
    for (const file of filesLoad) {
      loadedFiles += file.name + " , "
      this.formData.append("file", file)
    }
    $("#fileName").text(loadedFiles);
    this.isLoadFile = true
  }


  getAllFiles() {
    this.loadSpinner()
    this.filesService.getAllFiles().subscribe({
      next: (response) => {
        if (response.header.code == 200) {
          if (response.header.code == 200) {            
            this.archivos = response.data
            this.isLoaded = true;
          } else {
            this.common.showWarnning(response.header.message)
          }
        } else {
          this.common.showWarnning(response.header.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.common.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    })
  }

  cleanData() {
    this.isLoaded = false;
    this.archivos = []
  }

  openDialogDelete(element: any): void {
    const title = element.name
    const message = `¿Estás seguro de eliminar el archivo?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        tittle: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.deleteFile(element.name)
      }
    });
  }

  deleteFile(fileName: any) {
    this.loadSpinner()
    this.filesService.deleteFile(fileName).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.common.showSuccess(response.message)
          this.getAllFiles()
        } else {
          this.common.showWarnning(response.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.common.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    }
    )
  }

  uploadFile() {
    this.loadSpinner()
    if (this.formData == null) {
      this.common.showWarnning("Selecciona al menos un archivo...")
      this.terminateSpinner()
      return
    }
    this.filesService.uploadFiles(this.formData).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.common.showSuccess(response.message)
          this.resetData()
          this.getAllFiles()
        } else {
          this.common.showWarnning(response.message)
          this.resetData()
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.common.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    }
    )
  }

  download(fileName: any) {
    console.warn(fileName)
		this.filesService.downloadFile(fileName).subscribe((response: any) => {
			let blob:any = new Blob([response]);
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			saveAs(blob, fileName);
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	}

  resetData() {
    this.isLoadFile = false
    $("#archivos").val(null);
    $("#fileName").text('Ningún archivo seleccionado.');
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

}
