import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const REPO_SEARCH = gql`
  query($term: String!) {
    search(type: REPOSITORY, query: $term, first: 10) {
      nodes {
        ... on Repository {
          name
          owner {
            login
            avatarUrl
          }
          forkCount
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const SearchDisplay = props => {
  const { term, createCard, open, setOpen } = props;
  const { loading, error, data } = useQuery(REPO_SEARCH, {
    variables: { term },
    errorPolicy: "all"
  });
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  return (
    <div>
      {!!data.search.nodes.length && (
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          See Repos
        </Button>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {data.search.nodes.map((item,index) => (
                    <MenuItem key={index} onClick={() => createCard(item)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
export default SearchDisplay;
