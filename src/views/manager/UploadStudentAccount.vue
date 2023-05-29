<template>
  <div class="upload-container">
    <h2>上传学生Excel表格</h2>
    <el-upload
      class="upload"
      action="http://localhost:8080/upload_student_account"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      @change="handleResumeChange"
    >
      <el-button type="primary" class="upload-button">点击上传</el-button>
    </el-upload>
    <div v-if="file" class="file-info">
      <span class="file-name">{{ file }}</span>
      <el-button type="text" @click="removeFile" class="remove-button">移除</el-button>
    </div>
    <el-button type="primary" :disabled="!file" class="submit-button" @click="submit">开始上传</el-button>
    <el-dialog title="上传结果" v-model="dialogVisible" width="30%">
      <div v-if="loading" class="loading-container">
        <el-loading text="上传中..." fullscreen></el-loading>
      </div>
      <div v-else>
        <span v-if="result === 'success'" class="success-message">上传成功！</span>
        <span v-if="result === 'fail'" class="error-message">上传失败：{{ errorMessage }}</span>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { simulateBackendProcessing } from "@/request/api";

export default {
  data() {
    return {
      file: null,
      dialogVisible: false,
      loading: false,
      result: null,
      errorMessage: "",
      excel: null
    };
  },
  methods: {
    handleSuccess(response) {
      // 处理上传成功的回调
      this.file = response.data;
    },
    handleResumeChange(file){
      this.excel =file
    },
    beforeUpload(file) {
      // 在上传之前的处理，例如限制文件类型和大小
      const isExcel =
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (!isExcel) {
        this.$message.error("只能上传Excel文件");
      }
      if (file.size > maxSize) {
        this.$message.error("文件大小不能超过10MB");
      }
      return isExcel && file.size <= maxSize;
    },
    removeFile() {
      // 移除文件
      this.file = null;
    },
    submit() {
      this.loading = true;
      simulateBackendProcessing(this.file)
        .then((response) => {
          this.result = "success";
          location.reload()
        })
        .catch((error) => {
          this.result = "fail";
          this.errorMessage = error.message || "上传失败，请稍后重试";
        })
        .finally(() => {
          this.loading = false;
          this.dialogVisible = true;
        });
    },
  },
};
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

h2 {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.upload {
  margin-bottom: 20px;
}

.upload-button {
  width: 100%;
}

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.file-name {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-button {
  color: #909399;
}

.submit-button {
  width: 100%;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.success-message {
  color: #67c23a;
}

.error-message {
  color: #f56c6c;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>