import { Col, Image, Modal, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { DisplayPromptResult } from "./DisplayPromptResult";
import { TABLE_ENFORCE_TYPE } from "./constants";
import SpaceWrapper from "../../widgets/space-wrapper/SpaceWrapper";

let TableOutput;
try {
  TableOutput = require("../../../plugins/prompt-card/TableOutput").TableOutput;
} catch {
  // The component will remain null of it is not available
}

function PromptOutputsModal({
  open,
  setOpen,
  llmProfiles,
  result,
  enforceType,
  displayLlmProfile,
}) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      centered
      maskClosable={false}
      footer={null}
      width={1600}
    >
      <SpaceWrapper>
        <Typography.Text
          className="prompt-output-pad prompt-output-title"
          strong
        >
          Prompt Results
        </Typography.Text>
        <Row style={{ height: "85vh" }}>
          {llmProfiles.map((profile, index) => {
            const profileId = profile?.profile_id;
            return (
              <Col
                className={`overflow-hidden height-100 prompt-output-pad ${
                  index < llmProfiles?.length - 1 && "border-right-grey"
                }`}
                key={profileId}
                span={24 / llmProfiles?.length}
              >
                <div className="flex-dir-col">
                  <div>
                    {displayLlmProfile && (
                      <div className="llm-info prompt-output-llm-bg">
                        <Image
                          src={profile?.icon}
                          width={15}
                          height={15}
                          preview={false}
                          className="prompt-card-llm-icon"
                        />
                        <Typography.Text className="prompt-card-llm-title">
                          {profile?.conf?.LLM}
                        </Typography.Text>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto pad-top-10">
                    {enforceType === TABLE_ENFORCE_TYPE && TableOutput ? (
                      <TableOutput
                        output={
                          result.find((r) => r?.profileManager === profileId)
                            ?.output
                        }
                        pagination={10}
                      />
                    ) : (
                      <DisplayPromptResult
                        output={
                          result.find((r) => r?.profileManager === profileId)
                            ?.output
                        }
                      />
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </SpaceWrapper>
    </Modal>
  );
}

PromptOutputsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  llmProfiles: PropTypes.array.isRequired,
  result: PropTypes.array.isRequired,
  enforceType: PropTypes.string.isRequired,
  displayLlmProfile: PropTypes.bool.isRequired,
};

export { PromptOutputsModal };