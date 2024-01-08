/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import Select from "react-select";
import {
  align,
  bg,
  border,
  center,
  column,
  fg,
  gap,
  h,
  justify,
  padding,
  row,
  scroll,
  text,
  w,
} from "../styles";
import "./index.css";

type Option = {
  label: string;
  value: string;
};
type Video = {
  id: string;
  viewCount: number;
  duration: number;
};

function num2str(num: number) {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + "K";
  if (num / 1000000) return (num / 1000000).toFixed(1) + "M";
  return (num / 1000000000).toFixed(1) + "B";
}

const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);
    return result;
  };
};

function Label({ text }: { text: string }) {
  return (
    <div
      css={[
        padding.horizontal(4),
        // padding.vertical(2),
        border.round(2),
        bg.black,
        fg.white,
        border.round(4),
      ]}
    >
      {text}
    </div>
  );
}

function Epic1min() {
  const n = 12;
  const [option, setOption] = useState<Option>({
    label: "views/s",
    value: "density",
  });
  const [videos, setVideos] = useState<Video[]>([]);
  const [shownVideos, setShownVideos] = useState<Video[]>([]);
  const selectRef = useRef(null);
  const [value, setValue] = useState<string>("");
  const debouncedOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, 1000);
  useEffect(() => {
    (async function () {
      const url = `http://localhost:3000/epic1min?option=${option.value}`;
      const videos = await axios.get(url, { withCredentials: true });
      setVideos(videos.data as Video[]);
      setShownVideos(videos.data.slice(0, n));
    })();
  }, [option]);
  useEffect(() => {
    if (value === "") return;
    try {
      const url = new URL(value);
      const isValid =
        url.origin === "https://www.youtube.com" && url.pathname === "/watch";
      if (isValid) {
        const id = url!.searchParams.get("v");
        if (id !== null) {
          axios.get(`http://localhost:3000/epic1min/register?id=${id}`, {
            withCredentials: true,
          });
          toast.success("Thanks for registering video!");
          return;
        }
      }
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
    }
    toast.error("URL looks strange! Please check again");
  }, [value]);

  return (
    <div css={[w("hug"), h("hug"), column, justify.center, gap(16)]}>
      <div
        css={[w("fill"), text.titleM, row, justify.center, align.center]}
        style={{ flexWrap: "wrap", columnGap: "8px" }}
      >
        <h1 css={[text.displayL]} style={{ fontWeight: "800" }}>
          Epic1min
        </h1>
        <div css={[w("hug"), text.bodyS, column, justify.center]}>
          <h2 css={[w("hug")]}>more than 10M views</h2>
          <h2 css={[w("hug")]}>less than 1 minute</h2>
        </div>
      </div>
      <div
        css={[w("hug"), h(500), row, justify.center, gap(16), scroll.y]}
        style={{ flexWrap: "wrap" }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            setShownVideos((shownVideos) => [
              ...shownVideos,
              ...videos.slice(shownVideos.length, shownVideos.length + n),
            ]);
          }}
          hasMore={shownVideos.length < videos.length}
          useWindow={false}
          css={[w("hug"), row, justify.center, gap(16)]}
          style={{ flexWrap: "wrap" }}
        >
          {shownVideos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              css={[w(320), h(180)]}
              style={{
                position: "relative",
                textDecoration: "none",
                color: "inherit",
                outline: 0,
              }}
            >
              <img
                key={video.id}
                width="320"
                height="180"
                src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                css={[border.round(8)]}
              />
              <div
                css={[w("hug"), h("hug"), text.labelS, row, gap(4)]}
                style={{ position: "absolute", bottom: "4px", right: "4px" }}
              >
                <Label text={num2str(video.viewCount)} />
                <Label
                  text={`${Math.floor(video.duration / 60)}:${(
                    video.duration % 60
                  )
                    .toString()
                    .padStart(2, "0")}`}
                />
              </div>
            </a>
          ))}
        </InfiniteScroll>
      </div>
      <div
        css={[w("fill"), text.titleM, row, center]}
        style={{ flexWrap: "wrap", columnGap: "8px" }}
      >
        <Select
          ref={selectRef}
          menuPlacement="auto"
          defaultValue={option}
          isSearchable={false}
          options={[
            { label: "views/s", value: "density" },
            { label: "view", value: "viewCount" },
            { label: "length", value: "duration" },
          ]}
          css={[w(150), text.titleM]}
          onChange={(option) => {
            if (option !== null) setOption(option);
          }}
        />
        <input
          css={[
            text.bodyM,
            w(200),
            h(38),
            border.black,
            border.round(4),
            padding.horizontal(8),
          ]}
          placeholder="Register New YouTube video"
          onChange={debouncedOnChange}
        />
      </div>
    </div>
  );
}

export default Epic1min;
