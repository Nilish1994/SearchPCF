import * as React from "react";
import { useCallback, useState } from "react";
import Tree from "antd/es/tree";
import type { DataNode, TreeProps } from "antd/es/tree";
import type { MenuProps } from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import openSidePane from "../utils/openSidePane";
import { Modal, notification, Spin } from "antd";
import { Input, Button } from 'antd';
// import 'antd/dist/antd.css';

const { Search } = Input;

import {
  DownOutlined,
  CopyOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  SnippetsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Key } from "antd/es/table/interface";
import cloneDeep from "lodash.clonedeep"

import * as Constants from "../constants/index";
import { res_one } from "./sample_real_data";

export default function SearchView() {
  const { DirectoryTree } = Tree;
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  const searchHandler = useCallback((info) => {
    console.log('info =====> ', info);
    if (info === "") {
      setSearchResult([]);
    } else {
      setSearchResult(res_one);
    }
  }, []);

  const handleExpand = (
    expandedKeys: Key[],
    info: { expanded: boolean; node: any }
  ) => {
    const { node, expanded } = info;
    setExpandedKeys(expandedKeys);
  };

  const onClickNode = (selectedKeys: any, e: any) => {
    const { node } = e;
    const info = { expanded: true, node: {} };
    // handleExpand(selectedKeys, info)
    openSidePane(node.a_attr.LogicalName, node.id, node);
  };
  
  return (
    <div>
      <div className="search-container">
        <Search
          placeholder="Quick Search"
          allowClear
          size="small"
          onSearch={(value: string) => searchHandler(value)}
          className="search-box"
          // suffix={<SearchOutlined className="search-icon" />}
        />
      </div>
      <div>
        {searchResult && searchResult?.length > 0 && (
          <div className="custom-container">
            <DirectoryTree
              className="draggable-tree"
              defaultExpandedKeys={expandedKeys}
              treeData={searchResult}
              selectable={true}
              onExpand={handleExpand}
              showLine={true}
              onSelect={(selectedKeys, e) => onClickNode(selectedKeys, e)}
              switcherIcon={<DownOutlined />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
