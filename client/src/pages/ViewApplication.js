import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import { CandidatesSideView, JobApplicationView } from '_components';

const ViewApplication = (props) => {
    const [applicant, setApplicant] = useState(null)
    return (
        <div>
            <Card style={{ height: "100vh", background: "grey" }}>
                <Row gutter={[16, 16]}>
                    <Col span={applicant ? 6 : 24}>
                        <CandidatesSideView applicant={setApplicant} />

                    </Col>
                    <Col span={applicant ? 18 : 0}>
                        <JobApplicationView applicant={applicant} />
                    </Col>
                </Row>

            </Card>

        </div>
    )
}

export default ViewApplication
