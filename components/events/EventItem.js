import Image from "next/image";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Button from "../ui/Button";
import classes from "./EventItem.module.css";

const EventItem = ({ title, image, date, location, id }) => {
  const readableDate = new Date(date).toLocaleTimeString("en-Us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAdress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width="250" height="150" />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAdress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
