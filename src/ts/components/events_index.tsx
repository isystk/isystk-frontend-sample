import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import AppStore from "../Store";
import { readEvents } from "../actions";
import { Events, Event } from "../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  events: AppStateProperty[];
}
interface AppStateProperty {
  id: number;
  text: string;
}
interface AppDispatchProperties {
  readEvents;
}

export class EventsIndex extends React.Component<
  AppStateProperties & AppDispatchProperties,
  any
> {
  componentDidMount(): void {
    this.props.readEvents();
  }

  renderEvents(): JSX.Element {
    return _.map(this.props.events, (event) => (
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`}>{event.text}</Link>
        </TableRowColumn>
      </TableRow>
    ));
  }

  render(): JSX.Element {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    };
    return (
      <React.Fragment>
        <FloatingActionButton
          style={style}
          containerElement={<Link to="/events/new">新規登録</Link>}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableRowColumn>Text</TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: Events, ownProp?: any): AppStateProperties => ({
  events: _.map(state.events, function (event) {
    return {
      id: event.id,
      text: event.title + "," + event.body,
    };
  }),
});

const mapDispatchToProps = { readEvents };

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
