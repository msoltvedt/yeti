import { r as registerInstance, h, g as getElement } from './index-d74f5b26.js';
import { u as utils } from './utils-b92a1748.js';

const YetiProgressBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wrapperCSS = '';
    this.labelCSS = '';
    this.barCSS = '';
    this.barId = "";
    this.progress = 0;
    this.label = "";
    this.tooltipText = "";
    this.tooltipPosition = "";
    this.helperText = "";
    this.error = false;
    this.iLoveJSX = false;
  }
  handleProgressChange(newValue) {
    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      console.warn("Error in progress bar. Progress must be a number between 0 and 100.");
      this.progress = 0;
    }
  }
  renderIcon() {
    let state = "";
    if (this.error) {
      state =
        h("div", { class: "yeti-progress_bar-state" }, h("span", { class: "material-icons yeti-progress_bar-state-icon" }, "error"));
    }
    if (this.progress == 100) {
      state =
        h("div", { class: "yeti-progress_bar-state" }, h("span", { class: "material-icons yeti-progress_bar-state-icon", "aria-hidden": "true" }, "check_circle"), h("span", { class: "yeti-a11y-hidden" }, "Finished"));
    }
    return state;
  }
  renderLabel(labelCSS) {
    let state = "";
    let tooltipId = `${this.el.getAttribute("id")}_tooltip`;
    if (this.tooltipText != "" && this.tooltipPosition != "below") {
      state = h("yeti-tooltip", { text: this.tooltipText, id: tooltipId }, h("div", { class: labelCSS, tabIndex: 0 }, this.label, " ", h("span", { class: "yeti-a11y-hidden" }, this.progress, "%")));
    }
    else {
      state = h("div", { class: labelCSS }, this.label, " ", h("span", { class: "yeti-a11y-hidden" }, this.progress, "%"));
    }
    return state;
  }
  renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle) {
    let progressBar = h("div", Object.assign({ class: wrapperCSS, id: this.barId }, ((this.tooltipText != "" && this.tooltipPosition == "below") ? { tabIndex: 0 } : {})), h("div", { class: "yeti-progress_bar-header" }, this.renderLabel(labelCSS), this.renderIcon()), h("div", { class: barCSS, "aria-hidden": "true" }, h("div", { class: "yeti-progress_bar-bar-actual", style: actualStyle })), (this.helperText != "") ?
      h("div", { class: "yeti-progress_bar-tip" }, this.helperText)
      :
        "");
    return progressBar;
  }
  componentWillLoad() {
    // Set up ids
    let componentId = this.el.getAttribute("id");
    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }
    this.barId = (this.barId != "") ? this.barId : `${componentId}_bar`;
    this.handleProgressChange(this.progress);
  }
  render() {
    let wrapperCSS = 'yeti-progress_bar';
    let labelCSS = 'yeti-progress_bar-label';
    let barCSS = 'yeti-progress_bar-bar';
    let tooltipId = `${this.el.getAttribute("id")}_tooltip`;
    wrapperCSS += (this.progress == 100) ? " yeti-progress_bar__complete" : "";
    wrapperCSS += (this.error) ? " yeti-progress_bar__error" : "";
    wrapperCSS += (this.wrapperCSS && this.wrapperCSS != "") ? " " + this.wrapperCSS : "";
    labelCSS += (this.labelCSS && this.labelCSS != "") ? " " + this.labelCSS : "";
    barCSS += (this.barCSS && this.barCSS != "") ? " " + this.barCSS : "";
    let actualStyle = {
      width: `${this.progress}%`
    };
    return ((this.tooltipText != "" && this.tooltipPosition == "below") ?
      h("yeti-tooltip", { text: this.tooltipText, position: this.tooltipPosition, id: tooltipId, blockAnchor: true }, this.renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle))
      :
        this.renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "progress": ["handleProgressChange"]
  }; }
};

export { YetiProgressBar as yeti_progress_bar };

//# sourceMappingURL=yeti-progress-bar.entry.js.map