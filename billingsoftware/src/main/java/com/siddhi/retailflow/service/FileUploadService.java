package com.siddhi.retailflow.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileUploadService {

    String uploadFileService(MultipartFile file) throws IOException;

    boolean deleteFileService(String imgUrl);

}
