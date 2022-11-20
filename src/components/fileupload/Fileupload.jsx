import React from "react";
import "./Fileupload.css";
function Fileupload() {
  return (
    <div>
      <div className="row">
        <div className="col s12">
          <div id="zdrop" className="fileuploader ">
            <div id="upload-label" style="width: 200px;">
              <i className="material-icons">cloud_upload</i>
              <span className="title">Drag your Files here</span>
              <span>Some description here </span>
            </div>
          </div>

          <div className="preview-container">
            <div className="header">
              <span>Uploaded Files</span>
              <i id="controller" className="material-icons">
                keyboard_arrow_down
              </i>
            </div>
            <div className="collection card" id="previews">
              <div
                className="collection-item clearhack valign-wrapper item-template"
                id="zdrop-template"
              >
                <div className="left pv zdrop-info" data-dz-thumbnail>
                  <div>
                    <span data-dz-name></span> <span data-dz-size></span>
                  </div>
                  <div className="progress">
                    <div
                      className="determinate"
                      style="width:0"
                      data-dz-uploadprogress
                    ></div>
                  </div>
                  <div className="dz-error-message">
                    <span data-dz-errormessage></span>
                  </div>
                </div>

                <div className="secondary-content actions">
                  <a
                    href="#!"
                    data-dz-remove
                    className="btn-floating ph red white-text waves-effect waves-light"
                  >
                    <i className="material-icons white-text">clear</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fileupload;
