import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VpnLockIcon from "@mui/icons-material/VpnLock";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import { capitalizeFirstLetter } from "~/ultis/formatters";

const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  px: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label={capitalizeFirstLetter(board?.title)}
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Drive"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<MotionPhotosAutoIcon />}
          label="Automation"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white", borderWidth: "2px" },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0de" },
            },
          }}
          max={4}
        >
          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>

          <Tooltip title="duongtranngoc">
            <Avatar alt="duongtranngoc" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
