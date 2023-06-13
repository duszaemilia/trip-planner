import AddNote from "./AddNote.jsx";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/Inbox";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Grid from '@mui/material/Unstable_Grid2';
import Collapse from '@mui/material/Collapse';
import {Link} from "react-router-dom";
import {useState} from "react";

import * as PropTypes from "prop-types";

TripDetails.propTypes = {
    trip: PropTypes.any,
    noteId: PropTypes.any,
    setNoteId:PropTypes.any,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

export default function TripDetails(props) {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    return <Container maxWidth="md">
        <Grid xs={12}>
            <List
                sx={{width: '100%', maxWidth: '100%', bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`${props.trip.title} from ${props.trip.startDate} to ${props.trip.endDate}`}
                                  secondary={props.trip.description}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>

                                <Stack spacing={4} gap={4} direction="row">
                                    {props.noteId === props.trip.id ? (
                                        <AddNote
                                            setNoteId={props.setNoteId}
                                            tripId={props.trip.id}/>) : (
                                        <Button onClick={props.onClick} variant="outlined">Add note</Button>
                                    )}

                                    <Link to={`/trip-card/${props.trip.id}/notes`}>
                                        <Button variant="outlined">See all notes</Button>
                                    </Link>
                                    <Button onClick={props.onClick1} data-id={props.trip.id}
                                            variant="outlined">Delete</Button>

                                </Stack>

                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

        </Grid>
    </Container>;
}

