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

export default function TripDetails({ trip, noteId, setNoteId, onClick, onClick1 }) {

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
                    <ListItemText primary={`${trip.title} from ${trip.startDate} to ${trip.endDate}`}
                                  secondary={trip.description}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>

                                <Stack spacing={4} gap={4} direction="row">
                                    {noteId === trip.id ? (
                                        <AddNote
                                            setNoteId={setNoteId}
                                            tripId={trip.id}/>) : (
                                        <Button onClick={onClick} variant="outlined">Add note</Button>
                                    )}

                                    <Link to={`/trip-card/${trip.id}/notes`}>
                                        <Button variant="outlined">See all notes</Button>
                                    </Link>
                                    <Button onClick={onClick1} data-id={trip.id}
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

