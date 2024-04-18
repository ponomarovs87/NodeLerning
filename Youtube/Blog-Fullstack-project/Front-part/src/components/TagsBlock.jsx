import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedTag } from "../Redux/slices/posts";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();

  const options = items.map((option) => {
    const firstLetter = option.toString()[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      title: option,
    };
  });

  const handleTagSelect = (event, value) => {
    if (value) {
      dispatch(setSelectedTag(value.title));
    }
  };

  return (
    <SideBlock>
      <Autocomplete
        id="TegsFoundBlock"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        onChange={handleTagSelect}
        renderInput={(params) => (
          <TextField {...params} label="Поиск по тегу" />
        )}
        style={{ width: "100%", padding: "0 15px" }}
      />

      <List>
        {(isLoading ? [...Array(5)] : items).slice(0, 5).map((name, i) => (
          <a
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => dispatch(setSelectedTag(name))}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
