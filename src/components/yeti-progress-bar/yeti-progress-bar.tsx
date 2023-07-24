import { Component, Prop, h, State, Element, Watch } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-progress-bar',
  shadow: false,
})
export class YetiProgressBar {

  @Element() el: HTMLElement;

  /**
   * CSS classlist to add to the component's outer wrapper element.
   */
  @Prop({ attribute: 'wrapper-class'}) wrapperCSS: string = '';

  /**
   * CSS classlist to add to the component's actual label element.
   */
  @Prop({ attribute: 'label-class'}) labelCSS: string = '';

  /**
   * CSS classlist to add to the element representing the component's progress bar.
   */
  @Prop({ attribute: 'bar-class'}) barCSS: string = '';

  /**
   * id of the element representing the component's progress bar. Will be given an auto-generated unique id if one is not provided.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) barId: string = ""; // Set on load

  /**
   * Number between 0 and 100 that describes the percentage complete to display in the bar.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) progress: number = 0;
  @Watch('progress')
  handleProgressChange(newValue: number) {
    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      console.warn("Error in progress bar. Progress must be a number between 0 and 100.");
      this.progress = 0;
    }
  }

  /**
   * Text content for the component's label.
   */
  @Prop() label: string = "";

  /**
   * Text content for the component's tooltip.
   */
  @Prop() tooltipText: string = "";

  /**
   * Token list describing the component's tooltip's position relative to the bar: left | right and/or above | below.
   */
  @Prop() tooltipPosition: string = "";

  /**
   * Text content that appears beneath the bar as helper text.
   */
  @Prop() helperText: string = "";

  /**
   * Whether or not the bar should depict an error state.
   */
  @Prop() error: boolean = false;

  /**
   * Toggle to re-render the entire component.
   */
  @State() iLoveJSX: boolean = false;



  renderIcon() {
    let state = "";
    
    if (this.error) {
      state = 
      
        <div class="yeti-progress_bar-state">

          <span class="material-icons yeti-progress_bar-state-icon">error</span>

        </div>;

    }

    if (this.progress == 100) {
      state = 
      
        <div class="yeti-progress_bar-state">

          <span class="material-icons yeti-progress_bar-state-icon" aria-hidden="true">check_circle</span>
          <span class="yeti-a11y-hidden">Finished</span>

        </div>;

    }

    return state;

  }



  renderLabel(labelCSS: string) {
    let state = "";
    let tooltipId = `${this.el.getAttribute("id")}_tooltip`;
    
    if (this.tooltipText != "" && this.tooltipPosition != "below") {
      
      state = <yeti-tooltip text={this.tooltipText} id={tooltipId}>
        <div class={labelCSS} tabIndex={0}>{this.label} <span class="yeti-a11y-hidden">{this.progress}%</span></div>
      </yeti-tooltip>;

    } else {

      state = <div class={labelCSS}>{this.label} <span class="yeti-a11y-hidden">{this.progress}%</span></div>;

    }

    return state;

  }



  renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle) {
      let progressBar =

        <div 
          class={wrapperCSS}
          id={this.barId}
          {...((this.tooltipText != "" && this.tooltipPosition == "below") ? {tabIndex: 0} : {})}>

          <div class="yeti-progress_bar-header">
            
            {this.renderLabel(labelCSS)}

            {this.renderIcon()}

          </div>

          <div class={barCSS} aria-hidden="true">
              <div class="yeti-progress_bar-bar-actual" style={actualStyle}></div>
          </div>

          {(this.helperText != "") ?
          
            <div class="yeti-progress_bar-tip">{this.helperText}</div>

          : 
            
            ""

          }

        </div>

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

    return (

      (this.tooltipText != "" && this.tooltipPosition == "below") ?

        <yeti-tooltip 
          text={this.tooltipText} 
          position={this.tooltipPosition}
          id={tooltipId}
          blockAnchor={true}>
            
            {this.renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle)}
            
        </yeti-tooltip>
      
      :
        
        this.renderProgressBar(wrapperCSS, labelCSS, barCSS, actualStyle)

    );
  }

}