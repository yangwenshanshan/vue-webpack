<template>
  <div class="preview-upload-image" ref="previewUploadImage">
    <input ref="uploadIput" class="image-input" type="text" @focus="uploadIputFocus" @blur="uploadIputBlur">
    <div @drop="dropEvent" @dragover="handleDragover" @dragleave="handleDragleave" class="image-main" :class="isFocus ? 'image-main-hover' : ''">
      <template v-if="!isDelete">
        <img v-if="fileUrl" class="image" :src="fileUrl" @click="preivewImg(fileUrl)">
        <img v-else-if="image && image.url" class="image" :src="image.url" @click="preivewImg(image.url)">
      </template>
      <div class="preview-delete" @click="clearImage" v-if="(!disabled && (fileUrl || (image && image.url))) && !isDelete">
        <i class="preview-delete-icon el-icon-close"></i>
      </div>
      <div @click="hightLight" class="label" v-if="(!disabled && !fileUrl && (!image || !image.url)) || isDelete">
        <div class="choose-image-main" @mouseenter="mouseenter" @mouseleave="mouseleave">
          <label>
            <i class="choose-image-icon el-icon-plus"></i>
            <input ref="fileInput" type="file" accept="image/*" @change="fileChange" style="display: none" />
          </label>
        </div>
      </div>
    </div>

    <el-image-viewer v-if="imgViewerVisible" :on-close="() => { imgViewerVisible = false }" :url-list="srcList"></el-image-viewer>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  components: {
    ElImageViewer
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    image: {
      type: Object,
      default: () => {
        return {
          url: ''
        }
      }
    }
  },
  data () {
    return {
      isDelete: false,
      fileUrl: '',
      imgViewerVisible: false,
      srcList: [],
      isFocus: false
    }
  },
  methods: {
    handleDragover (e) {
      this.uploadIputFocus()
      e.preventDefault()
    },
    handleDragleave (e) {
      this.uploadIputBlur()
      e.preventDefault()
    },
    hightLight () {
      this.isFocus = true
    },
    uploadIputFocus () {
      this.isFocus = true
    },
    uploadIputBlur () {
      this.isFocus = false
    },
    mouseleave () {
      this.isFocus = false
      this.$refs.previewUploadImage.removeEventListener('paste', this.pasteEvent)
      this.$refs.uploadIput.blur()
    },
    mouseenter () {
      this.$refs.uploadIput.focus()
      this.$refs.previewUploadImage.removeEventListener('paste', this.pasteEvent)
      this.$refs.previewUploadImage.addEventListener('paste', this.pasteEvent)
    },
    dropEvent (event) {
      this.handleImage(event.dataTransfer)
      event.preventDefault();
    },
    pasteEvent (event) {
      this.handleImage(event.clipboardData)
      event.preventDefault();
    },
    handleImage (data) {
      let file = null
      if (data && data.items && data.items.length) {
        const array = data.items
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.kind === 'file' && element.type.indexOf('image') !== -1) {
            if (element.getAsFile) {
              file = element.getAsFile()
            } else {
              this.$message.info('暂不支持此浏览器复制图片文件')
            }
            break
          }
        }
        if (file) {
          this.uploadImgToBase64(file).then((data) => {
            this.fileUrl = data
            this.isDelete = false
            this.$emit('change', this.fileUrl)
          })
        } else {
          this.$message.info('请上传图片')
        }
      } else {
        this.$message.info('请上传图片')
      }
    },
    preivewImg (url) {
      this.imgViewerVisible = true
      this.srcList = [url]
    },
    clearImage () {
      this.isDelete = true
      this.$emit('change', '')
    },
    uploadImgToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      });
    },
    fileChange (e) {
      const file = e.target.files[0]
      this.$refs.fileInput.value = ''
      this.uploadImgToBase64(file).then((data) => {
        this.fileUrl = data
        this.isDelete = false
        this.$emit('change', this.fileUrl)
      })
    },
  }
}
</script>

<style lang="scss">
.preview-upload-image{
  display: flex;
  position: relative;
  .image-main{
    position: relative;
    width: 200px;
    height: 100px;
    border: 1px dashed #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    .preview-delete{
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 18px;
      cursor: pointer;
      .preview-delete-icon{
        position: absolute;
        top: 1px;
        right: 1px;
        color: #fff;
        font-size: 14px;
      }
    }
    .image{
      width: 100%;
      height: 100%;
      cursor: pointer;
      object-fit: contain;
    }
    .label{
      width: 100%;
      height: 100%;
      .choose-image-main{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .choose-image-icon{
          font-size: 44px;
          color: #dcdee0;
          cursor: pointer;
        }
      }
    }
  }
  .image-main-hover{
    border: 1px dashed #3064c7;
  }
  .image-input{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
.el-image-viewer__mask{
  width: 100%;
}
</style>