<template>
  <div id="app">
    <div ref="editor" class="demo-anchor demo-anchor--bordered demo-anchor--active" data-demo-type="document">
      <div id="cke5-decoupled-document-demo" aria-labelledby="document">
        <div class="cke5-decoupled-document-toolbar"></div>
        <div class="cke5-decoupled-document-editable">
          <div class="title-input-area">
            <a-input class="page-title-input" placeholder="在这里输入文章标题"/>
          </div>
          <ckeditor :editor="editor" v-model="editorData" @ready="onReady" :config="editorConfig"></ckeditor>
        </div>
      </div>
      <div class="command-area">
        <a-button class="btns">保存</a-button>
        <a-button type="primary" class="btns">提交</a-button>
      </div>
      <div v-show="isExpand" class="resize-editor-tool" ref="resizeEditorTool"
           @mousedown.prevent.stop="beforeEditorResize">
        <a-icon type="menu" class="menu"/>
      </div>
      <div class="expand-tool" @click="switchExpandTool">
        <a-icon type="double-left" v-if="!isExpand"/>
        <a-icon type="double-right" v-if="isExpand"/>
        <span>{{ expandText }}</span>
      </div>
    </div>
    <div class="side-area" ref="sideArea">
      <div class="search-bar">
        <a-input-search v-model="searchWords" placeholder="输入关键词搜索，比如：医学" @change="onSearch" @search="onSearch" />
      </div>
      <div class="search-list">
        <div class="search-list-item" @click="showContent = true" v-for="(item, idx) in getListData" :key="idx">
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="content-box" v-show="showContent">
        <a-icon type="close" class="close" @click="showContent = false"/>
        <div class="content" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn";

export default {
  name: "App",
  components: {},
  data() {
    return {
      showDetail: false,
      editor: DecoupledEditor,
      editorData: "在这里输入文章内容",
      editorConfig: {
        // The configuration of the editor.
        language: "zh-cn",
      },
      editorMoveEvent: null,
      // 是否展开状态
      isExpand: false,
      showEditorTool: false,
      customWith: '',
      showContent: false,
      searchList: [
        {title: '依托国家自然科学基金推动国际科研合作发展 ——以北京大学医学部为例'},
        {title: '医学血液细胞检验的质量控制探讨'},
        {title: '浅析高中生物学中的医学知识信息'},
        {title: '浅谈高中生如何将医学与科技相融合'},
        {title: '"一带一路"下的医学大健康信息服务研究'},
        {title: '现代生物技术在医学领域的应用'},
        {title: '谈如何激发学生学习医学的兴趣'},
        {title: '对于我国医学病理档案管理提升的措施与思考'},
        {title: '关于高中生物渗透医学健康的学习探讨'},
        {title: '医学院研究生生源对培养质量的影响分析'},
        {title: '汽车产品CAD数据质量关键技术研究 '},
        {title: '电子线路CAD课程改革 '},
        {title: 'CAD教学心得体会'},
        {title: '基于学生创新能力培养的CAD教学策略'},
        {title: '不同服装CAD软件的制版特点及应用探究 '},
      ],
      content: `摘要： 在中职机械类专业中,CAD是一门至关重要的学科,是每一名学生都应掌握的基本技能.随着现代职业教育的不断发展,CAD教学不仅要让学生掌握该绘图软件的技能要点,更要让学生拥有创新的思维与能力.本文立足于CAD课程教学,分别从兴趣建设、学生认知特点、小组合作形式及实践教学四个方面,探析CAD课程教学对学生创新能力培养的策略与途径.学困生是指那些智力与感官正常,但学习效果低下,达不到国家规定的学科课程标准要求的学生.学困生转化工作是实施素质教育不可或缺的一部分,不容忽视.当然,
      只有重视学困生的转化工作,才谈得上是面向全体学生,才能全面提高学生的基本素质,才是真正意义上的素质教育.<br/><hr/>
      摘要： 在中职机械类专业中,CAD是一门至关重要的学科,是每一名学生都应掌握的基本技能.随着现代职业教育的不断发展,CAD教学不仅要让学生掌握该绘图软件的技能要点,更要让学生拥有创新的思维与能力.本文立足于CAD课程教学,分别从兴趣建设、学生认知特点、小组合作形式及实践教学四个方面,探析CAD课程教学对学生创新能力培养的策略与途径.学困生是指那些智力与感官正常,但学习效果低下,达不到国家规定的学科课程标准要求的学生.学困生转化工作是实施素质教育不可或缺的一部分,不容忽视.当然,
      只有重视学困生的转化工作,才谈得上是面向全体学生,才能全面提高学生的基本素质,才是真正意义上的素质教育.<br/>
      摘要： 在中职机械类专业中,CAD是一门至关重要的学科,是每一名学生都应掌握的基本技能.随着现代职业教育的不断发展,CAD教学不仅要让学生掌握该绘图软件的技能要点,更要让学生拥有创新的思维与能力.本文立足于CAD课程教学,分别从兴趣建设、学生认知特点、小组合作形式及实践教学四个方面,探析CAD课程教学对学生创新能力培养的策略与途径.学困生是指那些智力与感官正常,但学习效果低下,达不到国家规定的学科课程标准要求的学生.学困生转化工作是实施素质教育不可或缺的一部分,不容忽视.当然,
      只有重视学困生的转化工作,才谈得上是面向全体学生,才能全面提高学生的基本素质,才是真正意义上的素质教育.<br/><hr/>
      摘要： 在中职机械类专业中,CAD是一门至关重要的学科,是每一名学生都应掌握的基本技能.随着现代职业教育的不断发展,CAD教学不仅要让学生掌握该绘图软件的技能要点,更要让学生拥有创新的思维与能力.本文立足于CAD课程教学,分别从兴趣建设、学生认知特点、小组合作形式及实践教学四个方面,探析CAD课程教学对学生创新能力培养的策略与途径.学困生是指那些智力与感官正常,但学习效果低下,达不到国家规定的学科课程标准要求的学生.学困生转化工作是实施素质教育不可或缺的一部分,不容忽视.当然,
      只有重视学困生的转化工作,才谈得上是面向全体学生,才能全面提高学生的基本素质,才是真正意义上的素质教育.<br/><hr/>
      摘要： 在中职机械类专业中,CAD是一门至关重要的学科,是每一名学生都应掌握的基本技能.随着现代职业教育的不断发展,CAD教学不仅要让学生掌握该绘图软件的技能要点,更要让学生拥有创新的思维与能力.本文立足于CAD课程教学,分别从兴趣建设、学生认知特点、小组合作形式及实践教学四个方面,探析CAD课程教学对学生创新能力培养的策略与途径.学困生是指那些智力与感官正常,但学习效果低下,达不到国家规定的学科课程标准要求的学生.学困生转化工作是实施素质教育不可或缺的一部分,不容忽视.当然,
      只有重视学困生的转化工作,才谈得上是面向全体学生,才能全面提高学生的基本素质,才是真正意义上的素质教育.
      `,
      searchWords: ''
    };
  },
  computed: {
    expandText() {
      return this.isExpand ? '收起' : '展开侧边栏';
    },
    getListData() {
      if (this.searchWords === '') return [];
      const matchedList = [];
      this.searchList.forEach(item => {
        if (item.title.indexOf(this.searchWords) !== -1) {
          matchedList.push(item);
        }
      })
      return matchedList;
    }
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      const toolbar = document.querySelector(
          ".cke5-decoupled-document-toolbar"
      );
      toolbar.appendChild(editor.ui.view.toolbar.element);
      // console.log(toolbar.insertBefore);
      // editor.ui
      //   .getEditableElement()
      //   .parentElement.insertBefore(
      //     editor.ui.view.toolbar.element,
      //     editor.ui.getEditableElement()
      //   );
    },
    beforeEditorResize() {
      document.addEventListener('mousemove', this.onEditorResize)
      document.addEventListener('mouseup', this.onRemoveEditorEvents);
    },
    onEditorResize(e) {
      const {clientX} = e;
      const {editor, sideArea} = this.$refs;
      if (clientX <= 525) {
        return;
      } else if (clientX >= window.innerWidth - 10) {
        editor.style.width = window.innerWidth - 10 + 'px';
        return;
      }
      editor.style.width = clientX + 'px';
      this.customWith = editor.style.width;
      sideArea.style.width = window.innerWidth - clientX + 'px';
    },
    onRemoveEditorEvents() {
      document.removeEventListener('mousemove', this.onEditorResize);
      document.removeEventListener('mouseup', this.onRemoveEditorEvents);
    },
    switchExpandTool() {
      this.isExpand = !this.isExpand;
      const {editor, sideArea} = this.$refs;
      if (this.isExpand) {
        if (this.customWith) {
          editor.style.width = this.customWith;
        } else {
          editor.style.width = '796px';
        }
        sideArea.style.width = (window.innerWidth - Number(editor.style.width.split('px')[0])) + 'px';
      } else {
        editor.style.width = '100%';
        sideArea.style.width = '0';
      }
    },
    onSearch() {
      // console.log(e)
    }
  },
};
</script>

<style>
.expand-tool {
  position: absolute;
  right: 0;
  top: 16%;
  background: #42b983;
  line-height: 30px;
  padding: 0 10px 0 20px;
  color: white;
  opacity: .6;
  cursor: pointer;
  transition: opacity 200ms;
}

.expand-tool:hover {
  opacity: 1;
}

#app {
  /*background: #0098f7;*/
  overflow: hidden;
  /*display: flex;*/
}

.demo-anchor {
  /* display: none; */
  /* width: 870px;*/
  /*width: 796px;*/
  /* max-width: 100%; */
  /* margin: 0 auto; */
  position: relative;
  width: 100%;
  transition: width 200ms;
  float: left;
  z-index: 3;
}

.side-area {
  float: left;
  /*background: aqua;*/
  height: calc(100vh);
  width: 0;
  overflow: hidden;
  transition: width 200ms;
  position: relative;
}

.side-area .search-bar {
  width: 90%;
  /*height: 50px;*/
  margin: 20px auto 10px;
  /*background: aliceblue;*/
}

.side-area .search-list {
  box-sizing: border-box;
  width: 90%;
  height: calc(100vh - 74px);
  margin: 0 auto;
  /*background: #42b983;*/
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  padding: 10px;
}
.search-list .search-list-item {
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 200ms;
}
.search-list-item:hover {
  background: #e8e8e8;
}
/*.search-list-item:last-child {*/
/*  border-bottom: 0 none;*/
/*}*/

.side-area .content-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  overflow-y: auto;
  padding: 20px;
  z-index: 2;
}

.side-area .content-box .close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
}

.command-area {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 242px;
  height: 50px;
  background: rgba(123, 123, 123, 0.1);
  border-top-right-radius: 30px 24px;
  box-shadow: 2px 0 7px rgba(183, 183, 183, 0.8);
  line-height: 50px;
  text-align: center;
}

.btns:last-child {
  margin-left: 36px;
}

.resize-editor-tool {
  height: 70px;
  position: absolute;
  right: -7px;
  top: 50%;
  background: rgba(240, 240, 240, 0.7);
  border-radius: 10px;
  line-height: 70px;
  box-shadow: 0 0 7px rgba(183, 183, 183, 0.7);
  cursor: col-resize;
}

.resize-editor-tool > .menu {
  color: #aaa;
  transform: rotate(90deg);
  font-size: 12px;
}

.demo-anchor--active {
  display: block;
  animation-name: fadeIn;
  animation-iteration-count: 1s;
  animation-duration: 0.4s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.demo-anchor--bordered {
  border: 1px solid rgba(0, 0, 0, 0.15);
}

/*.demo-anchor[data-demo-type="document"] {*/
/*  width: 100%;*/
/*}*/
#cke5-decoupled-document-demo {
  background-color: #eee;
}

#cke5-decoupled-document-demo .ck-toolbar {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

#cke5-decoupled-document-demo .cke5-decoupled-document-editable {
  /* padding: 5rem 0; */
  /* max-height: 700px; */
  max-height: calc(100vh - 41px);
  padding-bottom: 5rem;
  overflow-y: auto;
}

#cke5-decoupled-document-demo .cke5-decoupled-document-editable {
  font-size: 17px;
  font-size: 1.7rem;
  line-height: 2.5rem;
}

.cke5-decoupled-document-editable .title-input-area {
  width: 21cm;
  margin: 16px auto;
}

#cke5-decoupled-document-demo .ck-content.ck-editor__editable {
  width: 21cm;
  min-height: 29.7cm;
  margin: 0 auto;
  padding: 0.5cm 1.2cm 2cm;
  border: 1px #d3d3d3 solid;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

</style>
