import { Injectable, inject, signal } from '@angular/core';
//import * as S3 from "aws-sdk/clients/s3";
import { HttpService } from './http.service';
import { lastValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { API_URLs } from '@constants/url';
import { UPLOAD_ACTION_TYPE } from '@enums/upload-action.enum';
import { ApiResponse } from '@interface/common.interface';
// import { InitiateMultipartUploadInterface } from '@components/features/ott-videos/video-add/video-upload-test/types/file-upload.interface';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  //bucket: S3;
  private CHUNK_SIZE = 6 * 1024 * 1024; // 5MB chunk size
  fileUploadProgess = signal(0);
  showProgressTracker = signal(false);
  uploadedChunksResponse: { etag: string; part: number }[] = [];
  uploadId!: string;
  utilityService = inject(UtilityService);
  constructor(
    private _httpService: HttpService,
    private _loaderService: LoaderService
  ) {}

  /**
   * Get pre signed url from api
   * @param fileToUpload
   * @param action
   * @returns
   */
  async getSignedUrl(
    fileToUpload: File,
    action = 'ADMIN_PROFILE',
    API = '',
    fileName = '',
    title = 'filename'
  ) {
    // try {
    const type = fileToUpload.type.split('/');

    const body = {
      action: action?.toUpperCase(),
      extension: this.utilityService.getFileExtension(fileName),
      title: title,
    };

    // const headers: {
    //   [name: string]: string | string[];
    // } = {};
    // headers['isVideoApi'] = 'true';
    const url = `${API}?action=${body.action}&extension=${body.extension}&title=${body.title}`;
    const response = this._httpService.get(url, {}, true);
    return await lastValueFrom(response);
  }

  /**
   * File upload to AWS S3 server
   * @param preSignedUrl
   * @param file
   * @returns
   */
  async fileUploadToS3(
    preSignedUrl: string,
    file: File,
    fileType: string
  ): Promise<Response> {
    const headers = new HttpHeaders({ 'Content-Type': fileType });
    const requestOptions = {
      method: 'PUT',
      body: file,
    };
    this._loaderService.displayLoader();
    const response = await fetch(preSignedUrl, requestOptions);
    this._loaderService.hideLoader();

    return response;
  }

  /**
   * @description Upload files to AWS Server
   * @param file
   * @returns
   */

  async uploadFile(
    file: File,
    action = UPLOAD_ACTION_TYPE.VIDEO
  ): Promise<any> {
    const fileName = this.utilityService.getFileNameWithoutExtension(file.name);
    const totalChunks = Math.ceil(file.size / this.CHUNK_SIZE);
    const extension = this.utilityService.getFileExtension(file.name);
    const body = {
      title: fileName,
      parts: totalChunks,
      action: action,
      extension: extension,
    };
    try {
      const response = await this.initiateUpload(body);
      const urls = response.result.urls;
      const uploadedChunks = await this.uploadChunks(
        file,
        fileName,
        totalChunks,
        urls
      );

      const completeResponse = await this.completeUpload(
        response.result.path,
        response.result.uploadId
      );
      return response.result; // Adjust the URL as per your backend setup
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * @description initiate file upload and create chunks
   * @param fileName
   * @returns
   */
  private async initiateUpload(body: {
    title: string;
    parts: number;
    action: string;
    extension: string;
  }): Promise<ApiResponse<any>> {
    const headers: {
      [name: string]: string | string[];
    } = {};
    headers['isVideoApi'] = 'true';
    const result: ApiResponse<any> =
      await this._httpService
        .get(`${API_URLs.INITIATE_MULTIPART_UPLOAD}`, body, true, headers)
        .toPromise();
    return result;
  }

  private async uploadChunks(
    file: File,
    fileName: string,
    totalChunks: number,
    signedUrls: string[]
  ): Promise<void[]> {
    let start = 0;
    let uploadedChunks = 0;
    const uploadPromises = [];
    this.uploadedChunksResponse = [];
    for (let i = 0; i < totalChunks; i++) {
      let start = i * this.CHUNK_SIZE;
      let end = start + this.CHUNK_SIZE;
      // If the remaining size is less than 5, include it in the last chunk
      if (i === totalChunks - 1 && file.size % this.CHUNK_SIZE < 5) {
        end = start + (file.size % this.CHUNK_SIZE);
      }
      const chunk = file.slice(start, end);
      // console.log(chunk);
      // const formData = new FormData();
      // formData.append('index', i.toString());
      // formData.append('totalChunks', totalChunks.toString());
      // formData.append('fileName', fileName);
      // formData.append('file', chunk);
      const requestOptions = {
        method: 'PUT',
        index: i.toString(),
        totalChunks: totalChunks.toString(),
        fileName: fileName,
        body: chunk,
      };
      this.showProgressTracker.set(true);
      const response = fetch(signedUrls[i], requestOptions)
        .then((response) => {
          // console.log(response.headers.get('Etag'));
          uploadedChunks++;

          this.fileUploadProgess.set(
            Math.floor((uploadedChunks / totalChunks) * 100)
          );
          const successChunks = {
            etag: JSON.parse(response.headers.get('Etag')!) || '',
            part: i + 1,
          };
          this.uploadedChunksResponse.push(successChunks);
        })
        .catch((error) => {});
      uploadPromises.push(response);
      start = end;
    }
    const completedChunks = await Promise.all(uploadPromises);

    return completedChunks;
  }

  private async completeUpload(path: string, uploadId: string): Promise<void> {
    const headers: {
      [name: string]: string | string[];
    } = {};
    headers['isVideoApi'] = 'true';
    this.uploadedChunksResponse.sort((a, b) => {
      return a.part - b.part;
    });
    const body = {
      key: path,
      uploadId: uploadId,
      parts: this.uploadedChunksResponse,
    };
    const { result }: { result: boolean } = await lastValueFrom(
      this._httpService.patch(
        API_URLs.COMPLETE_MULTIPART_UPLOAD,
        body,
        true,
        headers
      )
    );
    if (!result) {
      throw new Error('Error completing upload');
    }
  }
}
