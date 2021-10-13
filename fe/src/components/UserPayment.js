import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle,FormGroup,Label,Input,FormText, Button
} from 'reactstrap';

const Example = (props) => {

    
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h1">User Payment</CardTitle>
          <CardText>Upload your Proof payment</CardText>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
          <Button>Confirm</Button>
          <Button>Cancel</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Example;