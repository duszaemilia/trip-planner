import AddNote from "./AddNote.jsx";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox.js";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React from "react";
import Grid from '@mui/material/Unstable_Grid2';


export function TripDetail(props) {
    return <Container maxWidth="md">
        <Grid xs={12}>
            <List
                sx={{width: '100%', maxWidth: '100%', bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >
                <ListItemButton onClick={() => {
                }}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={props.trip.title} secondary={props.trip.description}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

            </List>
            <Stack spacing={4} gap={4} direction="row">
                {props.noteId === props.trip.id ? (<AddNote tripId={props.trip.id}/>) : (
                    <Button onClick={props.onClick} variant="outlined">Add note</Button>
                )}
                <Button onClick={props.onClick1} data-id={props.trip.id} variant="outlined">Delete</Button>
                <Button onClick={props.onClick1} data-id={props.trip.id} variant="outlined">See trip details</Button>

            </Stack>
        </Grid>
    </Container>;
}