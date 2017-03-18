"use strict";

var JsonFile = require('jsonfile')
    , Path = require('path')
    , _ = require('lodash');

var internals = {
    config: {}
};

internals.getConfigurationByEnvironment = function (env) {
    var configuration;

    switch (env) {
        case "development":
        case "dev":
            configuration = 'dev';
            break;
        case "qa" :
            configuration = 'qa';
            break;
        case "staging" :
            configuration = 'staging';
            break;
        case "prod":
        case "production":
            configuration = 'prod';
            break;
        default:
            configuration = 'default';
            break;
    }
    return configuration;
};

internals.save = function (path, configuration) {
    JsonFile.writeFileSync(path, configuration);
};

module.exports = Configuration;


/**
 * Configuration
 *
 * @param {object} [options]
 * @constructor
 */
function Configuration(options) {
    options = options || {};

    this.env = options.env || process.env.NODE_ENV || 'development';
    this.fileName = options.fileName || 'configuration.json';
    this.path = Path.join(__dirname, '../', this.fileName);
    this.configName = internals.getConfigurationByEnvironment(this.env);

    internals.config = JsonFile.readFileSync(this.path);
}

/**
 * Get all collections and configuration
 *
 * @public
 * @returns {object}
 */
Configuration.prototype.all = function () {
    return internals.config;
};

/**
 * Get the configuration by environment, defaults to current environment
 *
 * @param {string} [environment]
 * @returns {Object}
 */
Configuration.prototype.allByEnvironment = function (environment) {
    var config = this.configName;
    if (environment)
        config = internals.getConfigurationByEnvironment(environment);
    var self = this;
    var result = {};
    _.forEach(_.keys(self.all()), function (collection) {
        result[collection] = {};
        _.forEach(_.keys(self.allByCollection(collection)), function (name) {
            result[collection][name] = self.get(collection, name, config);
        });
    });
    return result;
};

/**
 * Get all the configuration scoped to a collection
 *
 * @param collection
 *
 * @returns {object}
 */
Configuration.prototype.allByCollection = function (collection) {
    return this.all()[collection];
};

/**
 * Configuration by collection name and environment
 *
 * @param {string} collection
 * @param {string} [environment]
 *
 * @returns {object}
 */
Configuration.prototype.allByCollectionAndEnvironment = function (collection, environment) {
    return this.allByEnvironment(environment)[collection];
};

/**
 * Get a value given a key
 *
 * @param {string} collection
 * @param {string} name
 * @param {string} [environment]
 * @returns {string|object}
 *
 */
Configuration.prototype.get = function (collection, name, environment) {
    var config = this.configName;
    if (environment)
        config = internals.getConfigurationByEnvironment(environment);
    if (!this.hasCollection(collection))
        return null;

    if (!this.has(collection, name))
        return null;

    if (this.hasEnvironmentForConfig(collection, name, config)) {
        return this.allByCollection(collection)[name][config];
    } else {
        return this.allByCollection(collection)[name]["default"];
    }
};

/**
 * Configuration has a collection and key
 *
 * @param collection
 * @param name
 * @returns {*|boolean}
 */
Configuration.prototype.has = function (collection, name) {
    var self = this;
    return _.has(self.all(), collection) && _.has(self.all()[collection], name);
};


/**
 * Configuration has a collection
 *
 * @param {string} name
 * @returns {boolean}
 */
Configuration.prototype.hasCollection = function (name) {
    return _.has(internals.config, name);
};

/**
 * Configuration has key for environment
 * @param {string} collection
 * @param {string} name
 * @param {string} configName
 */
Configuration.prototype.hasEnvironmentForConfig = function (collection, name, configName) {
    if (this.has(collection, name))
        return _.has(this.allByCollection(collection)[name], configName);
    else
        return false;
};

/**
 * Add a single value by collection, name and environment
 *
 * @param {string} collection
 * @param {string} name
 * @param {string} env
 * @param {object} value
 */
Configuration.prototype.add = function (collection, name, env, value) {
    if (!this.hasCollection(collection))
        internals.config[collection] = {};
    internals.config[collection][name][env] = value;
    internals.save(this.path, internals.config);
};

/**
 * Add configuration based on environment
 *
 * {
 *  "default": "",
 *  "prod": ""
 * }
 *
 * @param {string} collection
 * @param {string} name
 * @param {object} value
 */
Configuration.prototype.addWithEnvironments = function (collection, name, value) {
    if (!this.hasCollection(collection))
        internals.config[collection] = {};
    internals.config[collection][name] = value;
    internals.save(this.path, internals.config);
};

/**
 * Remove a configuration by collection and key
 *
 * @param {string} collection
 * @param {string} key
 */
Configuration.prototype.remove = function (collection, key) {
    if (this.has(collection, key)) {
        delete this.all()[collection][key];
    }
};