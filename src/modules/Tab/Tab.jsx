import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.css';

export const Tab = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabList}>
        {React.Children.map(children, (child) => {
          if (child.type.name === 'TabPane') {
            return (
              <button
                className={`${styles.tabButton} ${child.props.name === activeTab ? styles.active : ''}`}
                onClick={() => handleTabClick(child.props.name)}
              >
                {child.props.tab}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className={styles.tabContent}>
        {React.Children.map(children, (child) => {
          if (child.type.name === 'TabPane' && child.props.name === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveTab: PropTypes.string.isRequired,
};

const TabPane = ({ children }) => {
  return <div>{children}</div>;
};

TabPane.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  tab: PropTypes.node.isRequired,
};

Tab.TabPane = TabPane;