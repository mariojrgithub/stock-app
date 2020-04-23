import React, { Component } from "react";
import api from "../api";
import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control"
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

class PickFileUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      CAB_DRWR: "",
      TYPE: "",
      ENTITY: "",
      DESCRIPTION: "",
      ID_NUMB: "",
      DATE: "",
      COMMENT1: "",
      COMMENT2: "",
      COMMENT3: ""
    };
  }

  handleChangeInputDrwr = async event => {
    const CAB_DRWR = event.target.value;
    this.setState({ CAB_DRWR });
  };

  handleChangeInputType = async event => {
    const TYPE = event.target.value;
    this.setState({ TYPE });
  };

  handleChangeInputEntity = async event => {
    const ENTITY = event.target.value;
    this.setState({ ENTITY });
  };

  handleChangeInputDescription = async event => {
    const DESCRIPTION = event.target.value;
    this.setState({ DESCRIPTION });
  };

  handleChangeInputIDNumb = async event => {
    const ID_NUMB = event.target.value;
    this.setState({ ID_NUMB });
  };

  handleChangeInputDate = async event => {
    const DATE = event.target.value;
    this.setState({ DATE });
  };

  handleChangeInputComment1 = async event => {
    const COMMENT1 = event.target.value;
    this.setState({ COMMENT1 });
  };

  handleChangeInputComment2 = async event => {
    const COMMENT2 = event.target.value;
    this.setState({ COMMENT2 });
  };

  handleChangeInputComment3 = async event => {
    const COMMENT3 = event.target.value;
    this.setState({ COMMENT3 });
  };

  handleUpdatePickFile = async () => {
    const {
      id,
      CAB_DRWR,
      TYPE,
      ENTITY,
      DESCRIPTION,
      ID_NUMB,
      DATE,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    const payload = {
      CAB_DRWR,
      TYPE,
      ENTITY,
      DESCRIPTION,
      ID_NUMB,
      DATE,
      COMMENT1,
      COMMENT2,
      COMMENT3
    };

    await api.updatePickFileById(id, payload).then(res => {
      window.alert(`File updated successfully!`);
      this.setState({
        CAB_DRWR: "",
        TYPE: "",
        ENTITY: "",
        DESCRIPTION: "",
        ID_NUMB: "",
        DATE: "",
        COMMENT1: "",
        COMMENT2: "",
        COMMENT3: ""
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const pickfile = await api.getPickFileById(id);

    this.setState({
      CAB_DRWR: pickfile.data.data.CAB_DRWR,
      TYPE: pickfile.data.data.TYPE,
      ENTITY: pickfile.data.data.ENTITY,
      DESCRIPTION: pickfile.data.data.DESCRIPTION,
      ID_NUMB: pickfile.data.data.ID_NUMB,
      DATE: pickfile.data.data.DATE,
      COMMENT1: pickfile.data.data.COMMENT1,
      COMMENT2: pickfile.data.data.COMMENT2,
      COMMENT3: pickfile.data.data.COMMENT3
    });
  };

  render() {
    const {
      CAB_DRWR,
      TYPE,
      ENTITY,
      DESCRIPTION,
      ID_NUMB,
      DATE,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    return (
      <Wrapper>
        <Title>Update File</Title>

        <Label>CAB-DRWR: </Label>
        <InputText
          type="text"
          value={CAB_DRWR}
          onChange={this.handleChangeInputDrwr}
        />

        <Label>TYPE: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={TYPE}
          onChange={this.handleChangeInputType}
        />

        <Label>ENTITY: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={ENTITY}
          onChange={this.handleChangeInputEntity}
        />

        <Label>DESCRIPTION: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={DESCRIPTION}
          onChange={this.handleChangeInputDescription}
        />

        <Label>ID#: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={ID_NUMB}
          onChange={this.handleChangeInputIDNumb}
        />

        <Label>DATE: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={DATE}
          onChange={this.handleChangeInputDate}
        />

        <Label>COMMENT1: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT1}
          onChange={this.handleChangeInputComment1}
        />

        <Label>COMMENT2: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT2}
          onChange={this.handleChangeInputComment2}
        />

        <Label>COMMENT3: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT3}
          onChange={this.handleChangeInputComment3}
        />

        <Button onClick={this.handleUpdatePickFile}>Update File</Button>
        <CancelButton href={"/pickfiles/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default PickFileUpdate;
